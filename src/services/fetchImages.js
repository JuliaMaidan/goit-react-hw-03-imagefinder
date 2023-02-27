const KEY = '33056563-cc044f40a294fc1629405232d';

export const fetchImages = (search, page) => {
  return fetch(`https://pixabay.com/api/?q=${search}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)
    .then(response => response.json())
    .then(data => {
      if (data.hits.length === 0) {
        throw new Error("We don't have any matches.");
      }
      return data.hits;
    })
    .catch(error => {
      throw new Error("Something went wrong. Please try again later.");
    });
};