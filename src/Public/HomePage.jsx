import { useEffect, useState } from "react";
import BackGroundPic from "../components/BackgroundPic";
import Card from "../components/Card"
import NavbarPub from "../components/NavBarPub";
import Pagination from "../components/Pagination";
import Axios from "../helpers/Axios";
// import debounce from "debounce";
import Sort from "../components/Sort";
import Filter from "../components/Filter";
import Swal from "sweetalert2";

export default function HomePage() {
  const [products, setProduct] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("ASC");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [category, setCategory] = useState([]);

  const fetchCategories = async () => {
    try {
      let { data } = await Axios({
        url: `/pub/categories`,
        method: "GET",
      });
      console.log(data,"ccccccccc");

      setCategory(data);
    } catch (error) {
      if (error.response.status) {
        Swal.fire({
          title: "Information",
          text: `${error.response.data.message}`,
          icon: "error",
        });
      }
    }
  };

  const SearchProduct = async () => {
    try {
      let { data } = await Axios({
        url: `/pub?filter=${filter}&search=${search}&sort=${sort}&page=${currentPage}`,
        method: "GET",
        params: {
          filter :filter,
          sort: sort,
          search :search,
          page : currentPage
        },
        
      
      });
      console.log(data, "data home");

      setProduct(data.data);
      setTotalPage(data.data.pagination.totalPage);
    } catch (error) {
      // console.log(error.response);
      if (error.response.status) {
        Swal.fire({
          title: "Information",
          text: `${error.response.data.message}`,
          icon: "error",
        });
      }
    }
  };
  const handleClear = () => {
    setFilter("");
  };
  const NextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const PreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPage) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    SearchProduct();    
  }, [filter,sort,search,currentPage]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="">
        <div>
          <NavbarPub
            SearchProduct={SearchProduct}
            search={search}
            setSearch={setSearch}
          />
        </div>
        <div className="my-24">
          <BackGroundPic />
        </div>
        <div className="flex flex-row gap-5">
          <div className="ml-8">
            <Filter category={category} setFilter={setFilter} />
          </div>
       
          <div className="flex flex-row gap-5">
            <button
            onClick={handleClear}
            className="text-white bg-stone-700 hover:bg-stone-800 focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-stone-600 dark:hover:bg-stone-700 dark:focus:ring-stone-800"
          >
            clear
          </button>
            <Sort setSort={setSort} sort={sort} />
          </div>
        </div>
        <div className="mt-8 flex flex-wrap justify-center">
          {products.map((item) => (
            <Card key={item.id} products={item} />
          ))}
        </div>
        <div className="flex flex-wrap justify-center mt-10 mb-10">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPage}
            goToNextPage={NextPage}
            goToPreviousPage={PreviousPage}
            goToPage={goToPage}
          />
        </div>
      </div>
    </>
  );
}
