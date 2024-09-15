module.exports = {
  // Helper to check if the rating has a fractional part
  isHalf: (rating) => {
    return (rating % 1) !== 0;
  },

  // Helper to get the floor value
  floor: (rating) => {
    return Math.floor(rating);
  },

  // Helper to get the ceiling value
  ceil: (rating) => {
    return Math.ceil(rating);
  },

  // Helper to create a range (for looping in Handlebars)
  range: (start, end) => {
    const range = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  },

  // Helper to check if a number is less than or equal to another number
  lte: (a, b) => {
    return a <= b;
  },

  // Helper for equality check
  if_eq: (a, b, options) => {
    if (a === b) {
      return options.fn(this);
    }
    return options.inverse(this);
  }
};
