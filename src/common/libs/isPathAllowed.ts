type ListsType = 'includes' | 'endsWith';

interface IsPathAllowedParams {
  pathname: string;
  lists: string[];
  method: ListsType;
}

/**
 *
 * @example
 * isPathAllowed({
 *    // const { pathname } = useLocation();
 *    // const pathname = response.request.responseURL;
      pathname: window.location.pathname,
      lists: ['/info', '/history'],
      method: 'includes',
    })
 */
export const isPathAllowed = ({ pathname, lists, method }: IsPathAllowedParams): boolean => {
  if (!lists.length) return false;

  switch (method) {
    case 'includes':
      return lists.some((list) => pathname.includes(list));
    case 'endsWith':
      return lists.some((list) => pathname.endsWith(list));
    default:
      return false;
  }
};
