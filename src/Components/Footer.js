import React from "react";
import {
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillInstagram,
} from "react-icons/ai";
const Footer = () => {
  return (
    <div className="mx-auto container xl:px-20 lg:px-12 sm:px-6 px-4 py-12">
      <div className="flex flex-col items-center justify-center">
        <div>
          <img src="Mainlogo.png" alt="" style={{width:"50%",marginLeft:"274px"}} />
          {/* <svg
            width="111"
            height="19"
            viewBox="0 0 111 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.376 15.336H11.728V18H0.0640001V2.16H3.376V15.336ZM18.154 18.24C17.354 18.24 16.634 18.096 15.994 17.808C15.354 17.52 14.842 17.064 14.458 16.44C14.09 15.816 13.906 14.992 13.906 13.968V6H17.194V13.176C17.194 14.104 17.386 14.752 17.77 15.12C18.154 15.472 18.706 15.648 19.426 15.648C20.114 15.648 20.722 15.4 21.25 14.904C21.794 14.392 22.066 13.576 22.066 12.456V6H25.354V18H22.426L22.306 15.912C21.906 16.696 21.354 17.28 20.65 17.664C19.946 18.048 19.114 18.24 18.154 18.24ZM31.4779 6L33.9979 10.176L36.5419 6H40.2619L36.0139 11.928L40.3339 18H36.5179L33.8539 13.656L31.1419 18H27.4219L31.8379 11.928L27.6379 6H31.4779ZM44.134 4.272C42.774 4.272 42.094 3.688 42.094 2.52C42.094 1.336 42.774 0.743999 44.134 0.743999C45.494 0.743999 46.174 1.336 46.174 2.52C46.174 3.688 45.494 4.272 44.134 4.272ZM45.766 6V18H42.478V6H45.766ZM64.7314 6H68.2354L64.3954 18H60.6034L57.9874 9.84L55.4674 18H51.6754L47.8354 6H51.3394L53.7394 15.192L56.4034 6H59.6674L62.3554 15.192L64.7314 6ZM75.4188 5.76C76.6188 5.76 77.6828 6.008 78.6108 6.504C79.5388 7 80.2588 7.712 80.7708 8.64C81.2988 9.568 81.5628 10.688 81.5628 12C81.5628 13.312 81.2988 14.432 80.7708 15.36C80.2588 16.288 79.5388 17 78.6108 17.496C77.6828 17.992 76.6188 18.24 75.4188 18.24C74.2028 18.24 73.1308 17.992 72.2028 17.496C71.2908 17 70.5708 16.288 70.0428 15.36C69.5308 14.432 69.2748 13.312 69.2748 12C69.2748 10.688 69.5308 9.568 70.0428 8.64C70.5708 7.712 71.2908 7 72.2028 6.504C73.1308 6.008 74.2028 5.76 75.4188 5.76ZM75.4188 8.208C74.5228 8.208 73.8188 8.528 73.3068 9.168C72.8108 9.792 72.5628 10.736 72.5628 12C72.5628 13.264 72.8108 14.216 73.3068 14.856C73.8188 15.48 74.5228 15.792 75.4188 15.792C76.2988 15.792 76.9868 15.48 77.4828 14.856C77.9948 14.216 78.2508 13.264 78.2508 12C78.2508 10.736 77.9948 9.792 77.4828 9.168C76.9868 8.528 76.2988 8.208 75.4188 8.208ZM89.7859 5.76C90.9859 5.76 92.0499 6.008 92.9779 6.504C93.9059 7 94.6259 7.712 95.1379 8.64C95.6659 9.568 95.9299 10.688 95.9299 12C95.9299 13.312 95.6659 14.432 95.1379 15.36C94.6259 16.288 93.9059 17 92.9779 17.496C92.0499 17.992 90.9859 18.24 89.7859 18.24C88.5699 18.24 87.4979 17.992 86.5699 17.496C85.6579 17 84.9379 16.288 84.4099 15.36C83.8979 14.432 83.6419 13.312 83.6419 12C83.6419 10.688 83.8979 9.568 84.4099 8.64C84.9379 7.712 85.6579 7 86.5699 6.504C87.4979 6.008 88.5699 5.76 89.7859 5.76ZM89.7859 8.208C88.8899 8.208 88.1859 8.528 87.6739 9.168C87.1779 9.792 86.9299 10.736 86.9299 12C86.9299 13.264 87.1779 14.216 87.6739 14.856C88.1859 15.48 88.8899 15.792 89.7859 15.792C90.6659 15.792 91.3539 15.48 91.8499 14.856C92.3619 14.216 92.6179 13.264 92.6179 12C92.6179 10.736 92.3619 9.792 91.8499 9.168C91.3539 8.528 90.6659 8.208 89.7859 8.208ZM103.217 18.24C102.225 18.24 101.337 17.992 100.553 17.496C99.7851 17 99.1771 16.296 98.7291 15.384C98.2971 14.456 98.0811 13.336 98.0811 12.024C98.0811 10.696 98.3131 9.568 98.7771 8.64C99.2411 7.696 99.8651 6.984 100.649 6.504C101.449 6.008 102.345 5.76 103.337 5.76C104.201 5.76 104.945 5.968 105.569 6.384C106.193 6.8 106.665 7.352 106.985 8.04V0.743999H110.273V18H107.321L107.177 15.672C106.841 16.472 106.321 17.104 105.617 17.568C104.913 18.016 104.113 18.24 103.217 18.24ZM104.177 15.72C105.025 15.72 105.705 15.392 106.217 14.736C106.729 14.064 106.985 13.12 106.985 11.904C106.985 10.752 106.729 9.864 106.217 9.24C105.721 8.6 105.057 8.28 104.225 8.28C103.329 8.28 102.625 8.6 102.113 9.24C101.617 9.864 101.369 10.784 101.369 12C101.369 13.216 101.617 14.144 102.113 14.784C102.609 15.408 103.297 15.72 104.177 15.72Z"
              fill="#1F2937"
            />
          </svg> */}
        </div>
        {/* <div className="flex flex-wrap sm:gap-10 gap-8 items-center justify-center mt-8">
          <p className="hover:text-gray-500 text-base cursor-pointer leading-4 text-gray-800">
            About
          </p>
          <p className="hover:text-gray-500 text-base cursor-pointer leading-4 text-gray-800">
            Contact us
          </p>
          <p className="hover:text-gray-500 text-base cursor-pointer leading-4 text-gray-800">
            Terms of Service
          </p>
          <p className="hover:text-gray-500 text-base cursor-pointer leading-4 text-gray-800">
            Privacy Policy
          </p>
        </div> */}
        <div className="flex items-center gap-x-8 mt-6">
          <div className="cursor-pointer">
        <a href="https://www.linkedin.com/in/sahil-arora-4a3889227">    <AiFillLinkedin
              className="fill-current text-gray-800 hover:text-gray-500"
              style={{ height: "27px", width: "27px" }}
            />
            </a>
          </div>
          <div className="cursor-pointer">
          <a href="https://www.instagram.com/im_sahil_002"> 
            <AiFillInstagram
              className="fill-current text-gray-800 hover:text-gray-500"
              style={{ height: "27px", width: "27px" }}
            />
            </a>
          </div>
          <div className="cursor-pointer">
          <a href="https://twitter.com/arorasahil002"> 
            <AiFillTwitterCircle
              className="fill-current text-gray-800 hover:text-gray-500"
              style={{ height: "27px", width: "27px" }}
            />
            </a>
          </div>
        </div>
        <div className="flex items-center mt-6">
          <p className="text-base leading-4 text-gray-800">
            2022 <span className="font-semibold">BasketCrafts</span>
          </p>
          <div className="border-l border-gray-800 pl-2 ml-2">
            <p className="text-base leading-4 text-gray-800">
              Inc. All rights reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;