export const truncateTxt = ({ txt, n }: { txt: string; n: number }) => {
  return txt.length > n ? `${txt.substring(0, n)}...` : txt;
};
