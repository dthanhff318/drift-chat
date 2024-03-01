import Loading from 'app/components/Loading/Loading';
import React from 'react';

type Props = any;

const withLoading = (CompWithLoading: React.FC) => {
  const WithLoadingComponent: React.FC<Props> = ({ loading, children, ...props }) => {
    return loading ? (
      <Loading loading={true} />
    ) : (
      <CompWithLoading loading={loading} {...props}>
        {children}
      </CompWithLoading>
    );
  };

  // Đặt tên hiển thị cho component WithLoadingComponent
  WithLoadingComponent.displayName = 'WithLoading';

  return WithLoadingComponent;
};

export default withLoading;
