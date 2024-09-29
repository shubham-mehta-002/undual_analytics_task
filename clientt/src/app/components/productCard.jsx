export default function ProductCard({
  id,
  title,
  description,
  thumbnail,
  brand,
  price,
  discountPercentage,
  stock,
}) {
  return (
    <div
      className={`text-black px-2 py-1 border-2 border-[#E5E7EB] border-solid box-border rounded-md flex flex-col justify-between  w-[42vw] max-w-64 sm:w-[44vw] md:w-64 `}
    >
      <div className="content-wrapper flex flex-col my-1 h-[230px] justify-between">
        <div className="image-wrapper flex justify-center h-[70%] flex-shrink-0">
          <img
            src={thumbnail}
            alt={title}
            className="hover:cursor-pointer h-full sm:w-[70%] rounded-md object-fit "
          />
        </div>

        <div className="product-details h-[100px] flex flex-row">
          <div className="details w-[85%]">
            <div className="brand text-md font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
              {brand}
            </div>
            <div className="title text-sm whitespace-nowrap overflow-hidden text-ellipsis">
              {title}
            </div>
          </div>
        </div>

        <div className="price h-[50px] whitespace-nowrap overflow-hidden text-ellipsis">
          <span className="text-sm font-bold">
            ${Math.floor(((100 - discountPercentage) / 100) * price)}
          </span>
          <span className="text-sm font-semibold ml-2 text-[#949596]">
            $<strike>{price}</strike>
          </span>
          <span className="text-sm font-semibold ml-1 text-[#5a65e4]">
            ({discountPercentage}% OFF)
          </span>
        </div>
      </div>

      <div className="h-[5%] text-sm font-semibold text-red-600 flex justify-between">
        {stock === 0 && <p className="text-sm text-red-600">Out of stock</p>}
      </div>
    </div>
  );
}
