import React from "react";
import "./Home.scss";

const Home = () => {
  return (
    <div className="admin-home">
      <div className="admin-home-container">
        <div className="admin-welcome">
          <h1>Chào mừng bạn đến với Trang Quản trị</h1>
          <p>
            Đây là nơi bạn có thể quản lý các hoạt động, dữ liệu và người dùng của ứng dụng.
          </p>
        </div>
        <div className="admin-activities">
          <h2>Các Hoạt Động Quản Trị</h2>
          <ul>
            <li>Quản lý danh mục sản phẩm</li>
            <li>Quản lý đơn hàng và giao hàng</li>
            <li>Xem thống kê và báo cáo</li>
            <li>Quản lý người dùng và phân quyền</li>
          </ul>
        </div>
        <div className="admin-explore">
          <h2>Khám Phá Các Tính Năng</h2>
          <p>
            Khám phá các tính năng quản trị mạnh mẽ của ứng dụng và tận dụng chúng để tạo ra trải nghiệm tốt nhất cho người dùng.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
