import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import formatToRupiah from '../helpers/FormatToRupiah'
import Axios from "../helpers/Axios"
import NavbarDetail from '../components/NavbarDetail'
import Swal from "sweetalert2";

const DetailPage = () => {
  let { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading("loading...");
    try {
      const { data } = await Axios("/pub/" + id);
      // console.log(data,"detail data");
      
      setProduct(data);
    } catch (error) {
      if (error.response.status) {
        Swal.fire({
          title: "Information",
          text: `${error.response.data.message}`,
          icon: "error",
        });
      }
      // console.log(error);
      
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
    <div>
      <NavbarDetail/>
    </div>
      <div className="bg-white  py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg bg-gray-300  mb-4">
                <img
                  className="w-full h-full object-cover"
                  src={product.imgUrl}
                  alt="Product Image"
                />
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="text-2xl font-bold text-gray-800  mb-2">
                {product.name}
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                {product.description}
              </p>
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-gray-700">Price: </span>
                  <span className="text-gray-600">
                    {formatToRupiah(product.price)}{" "}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-gray-700">Stock: </span>
                  <span className="text-gray-600">{product.stock}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPage;
