module.exports = {
    range: (from, to, options) => {
      let accum = '';
      for (let i = from; i <= to; i++) {
        accum += options.fn(i);
      }
      return accum;
    },
};