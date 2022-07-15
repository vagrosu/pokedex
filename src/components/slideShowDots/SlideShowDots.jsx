import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import styles from './SlideShowDots.module.css';
import arrowRight from '../../assets/arrowRight.svg';
import arrowLeft from '../../assets/arrowLeft.svg';

function SlideShowDots(props) {
  const nextPageHandler = () => {
    if (props.page < props.lastPage) {
      props.setPage((prevPage) => prevPage + 1);
    }
  };

  const prevPageHandler = () => {
    if (props.page > 1) {
      props.setPage((prevPage) => prevPage - 1);
    }
  };

  const keyPressHandler = ({ key }) => {
    if (props.isKeyboardEnabled) {
      if (key === 'ArrowRight') {
        nextPageHandler();
      } else if (key === 'ArrowLeft') {
        prevPageHandler();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', keyPressHandler);
    return () => { window.removeEventListener('keyup', keyPressHandler); };
  }, [props.page, props.isKeyboardEnabled]);

  const displayDots = () => {
    const dots = [];
    if (props.lastPage > 9) {
      if (props.page <= 5) {
        for (let i = 1; i <= 7; i += 1) {
          dots.push((
            <div
              className={`${styles.dot} ${i === props.page && styles.active}`}
              onClick={() => { props.setPage(i); }}
              key={i}
            >
              <h5 className={styles.dotNumber}>{i}</h5>
            </div>
          ));
        }
        dots.push((<h4 className={styles.dotSpacer} key={8}>...</h4>));
        dots.push((
          <div
            className={styles.dot}
            onClick={() => { props.setPage(props.lastPage); }}
            key={props.lastPage}
          >
            <h5 className={styles.dotNumber}>{props.lastPage}</h5>
          </div>
        ));
      } else if (props.page >= props.lastPage - 4) {
        dots.push((
          <div
            className={styles.dot}
            onClick={() => { props.setPage(1); }}
            key={1}
          >
            <h5 className={styles.dotNumber}>{1}</h5>
          </div>
        ));
        dots.push((<h4 className={styles.dotSpacer} key={props.lastPage - 7}>...</h4>));
        for (let i = props.lastPage - 6; i <= props.lastPage; i += 1) {
          dots.push((
            <div
              className={`${styles.dot} ${i === props.page && styles.active}`}
              onClick={() => { props.setPage(i); }}
              key={i}
            >
              <h5 className={styles.dotNumber}>{i}</h5>
            </div>
          ));
        }
      } else {
        dots.push((
          <div
            className={styles.dot}
            onClick={() => { props.setPage(1); }}
            key={1}
          >
            <h5 className={styles.dotNumber}>{1}</h5>
          </div>
        ));
        dots.push((<h4 className={styles.dotSpacer} key={props.page - 3}>...</h4>));
        for (let i = props.page - 2; i <= props.page + 2; i += 1) {
          dots.push((
            <div
              className={`${styles.dot} ${i === props.page && styles.active}`}
              onClick={() => { props.setPage(i); }}
              key={i}
            >
              <h5 className={styles.dotNumber}>{i}</h5>
            </div>
          ));
        }
        dots.push((<h4 className={styles.dotSpacer} key={props.page + 3}>...</h4>));
        dots.push((
          <div
            className={styles.dot}
            onClick={() => { props.setPage(props.lastPage); }}
            key={props.lastPage}
          >
            <h5 className={styles.dotNumber}>{props.lastPage}</h5>
          </div>
        ));
      }
    } else {
      for (let i = 1; i <= props.lastPage; i += 1) {
        dots.push((
          <div
            className={`${styles.dot} ${i === props.page && styles.active}`}
            onClick={() => { props.setPage(i); }}
            key={i}
          >
            <h5 className={styles.dotNumber}>{i}</h5>
          </div>
        ));
      }
    }
    return dots;
  };

  return (
    <div className={`${styles.slideShowDotsContainer} ${props.className}`}>
      <img
        src={arrowLeft}
        alt="Previous page"
        onClick={prevPageHandler}
        className={`${styles.arrow} ${!(props.page > 1) && styles.arrowInactive}`}
      />
      {displayDots()}
      <img
        src={arrowRight}
        alt="Next page"
        onClick={nextPageHandler}
        onKeyUp={(e) => { console.log(e.key); }}
        className={`${styles.arrow} ${!(props.page < props.lastPage) && styles.arrowInactive}`}
      />
    </div>
  );
}

SlideShowDots.propTypes = {
  page: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  isKeyboardEnabled: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

SlideShowDots.defaultProps = {
  className: '',
};

export default SlideShowDots;
