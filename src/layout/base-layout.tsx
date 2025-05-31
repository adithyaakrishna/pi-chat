import { Outlet } from 'react-router-dom';

const BaseLayout = () => {
  return (
    <div className="min-h-screen bg-[#f8f3e9]">
      <Outlet />
    </div>
  );
};

export default BaseLayout;