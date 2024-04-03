import "./Home.scss";

const Home = (props) => {
  return (
    <>
      <div className="container">
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-size">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="https://www.pace.edu.vn/uploads/news/2023/12/1-moi-truong-vi-mo-la-gi.jpg"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://www.pace.edu.vn/uploads/news/2023/12/3-tac-dong-cua-moi-truong-vi-mo.jpg"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://www.pace.edu.vn/uploads/news/2023/12/5-cac-yeu-to-trong-moi-truong-vi-mo.jpg"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <div class="my-3">
          <h2>Thị trường việc làm hiện nay</h2>
          <div class="row">
            <div class="col-lg-6 col-md-6">
              <canvas id="myChart" class="mt-2 myChart"></canvas>
            </div>
            <div class="col-lg-6 col-md-6">
              <canvas id="growthChart" class="mt-2 growthChart"></canvas>
            </div>
          </div>
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">
            <i class="fa fa-search"></i>
          </span>
          <input
            type="text"
            id="keywordInput"
            class="form-control"
            placeholder="Tìm công việc"
            onkeypress="searchOnEnter(event)"
          />
        </div>

        <div class="my-3">
          <div class="row">
            <div class="col-lg-4 col-md-6">
              <label for="locationFilter" class="form-label">
                Chọn Địa Điểm:
              </label>
              <select
                id="locationFilter"
                class="form-select"
                onchange="handleLocationFilter()"
              >
                <option value="">Tất Cả</option>
                <option value="Hà Nội, Việt Nam">Hà Nội, Việt Nam</option>
                <option value="TP. Hồ Chí Minh, Việt Nam">
                  TP. Hồ Chí Minh, Việt Nam
                </option>
                <option value="Đà Nẵng, Việt Nam">Đà Nẵng, Việt Nam</option>
              </select>
            </div>
            <div class="col-lg-4 col-md-6">
              <label for="salaryFilter" class="form-label">
                Mức lương:
              </label>
              <select
                id="salaryFilter"
                class="form-select"
                onchange="handleSalaryFilter()"
              >
                <option value="">Tất Cả</option>
                <option value="Tăng dần">Tăng dần</option>
                <option value="Giảm dần">Giảm dần</option>
              </select>
            </div>
            <div class="col-lg-4 col-md-6">
              <label for="experienceFilter" class="form-label">
                Kinh nghiệm:
              </label>
              <select
                id="experienceFilter"
                class="form-select"
                onchange="handleExperienceFilter()"
              >
                <option value="">Tất Cả</option>
                <option value="Chưa có kinh nghiệm">Chưa có kinh nghiệm</option>
                <option value="Dưới 1 năm">Dưới 1 năm</option>
                <option value="Từ 1 đến 2 năm">Từ 1 đến 2 năm</option>
                <option value="Trên 2 năm">Trên 2 năm</option>
              </select>
            </div>
            <div class="col-lg-12 mt-3">
              <button class="btn btn-primary" onclick="filterJobs()">
                Tìm Kiếm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
