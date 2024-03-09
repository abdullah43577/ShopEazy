export const animationVariants = {
  hidden: {
    x: "100vw",
    opacity: 0,
  },

  visible: {
    x: 0,
    opacity: 1,

    transition: {
      delay: 0.2,
      duration: 1,
      type: "spring",
      stiffness: 120,
      when: "beforeChildren",
    },
  },
};

export const buttonVariants = {
  hidden: {
    x: 100,
    opacity: 0,
  },

  visible: {
    x: 0,
    opacity: 1,

    transition: {
      duration: 1,
      delay: 1,
    },
  },
};
