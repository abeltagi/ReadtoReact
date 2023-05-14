// // const list = ['a', 'b'];

// // const itemOne = list[0];
// // const itemTwo = list[1];

// // console.log(itemOne, itemTwo);

// // const [firstName, lastName] = list;

// // console.log(list);
// // console.log(typeof list);
// // console.log(firstName, lastName);

// const test = {
//   x: 42,
//   getX: function () {
//     return this.x;
//   }
// };

// const unboundGetX = test.getX;
// console.log(unboundGetX); // The function gets invoked at the global scope
// // Expected output: undefined

// // const boundGetX = unboundGetX.bind(module);
// // console.log(boundGetX());
// // // Expected output: 42

// const x = {
//   name: ' t',
//   add: 'mont',
//   live: 'choas'
// };

// const y = {
//   ...x,
//   money: '44',
//   add: function (abc) {
//     return {
//       ...x,
//       abc
//     };
//   }
// };

// console.log(x);
// console.log(y);
// console.log(y.add('lol'));

// const data = [
//   {
//     comments: 1204,
//     num_comments: -1
//   }
// ];
// const getSumComments = (stories) => {
//   console.log('C');

//   return stories.reduce((result, value) => result + value.num_comments, 0);
// };

// console.log('ayyaya', getSumComments(data));

const first = 'tarel';

const user = {
  first: first
};

console.log(user);

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

//only show the last search in button
const extractSearchTerm = (url) => url.replace(API_ENDPOINT, '');
console.log(extractSearchTerm(API_ENDPOINT));

const getLastSearches = (urls) =>
  //create new array
  urls.slice(-5).map((url) => extractSearchTerm(url));

console.log(getLastSearches(API_ENDPOINT));
