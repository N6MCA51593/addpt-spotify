import useSettings from './useSettings';

const useSorting = () => {
  const { assessArr } = useSettings();

  const sortArr = arr => {
    const sortingFunc = (a, b) => {
      if (a.isTracked && !b.isTracked) {
        return -1;
      } else if (!a.isTracked && b.isTracked) {
        return 1;
      } else if (a.isTracked && b.isTracked) {
        if (a.tracks) {
          return assessArr(b.tracks) - assessArr(a.tracks);
        } else {
          return assessArr(b.albums) - assessArr(a.albums);
        }
      }
    };
    return arr.concat().sort(sortingFunc);
  };

  return { sortArr };
};

export default useSorting;
