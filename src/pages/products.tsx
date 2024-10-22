import { Helmet } from 'react-helmet-async';

import { ProductsView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>

      <ProductsView />
    </>
  );
}
