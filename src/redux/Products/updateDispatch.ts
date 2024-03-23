import { handleAxiosErrors } from "@/components/utils/handleAxiosErrors";
import { SwalAlert } from "@/components/utils/SwalAlert";
import axios from "axios";

interface DispatchAction {
  productId: number;
  stateType: "wishlists" | "cartItems";
  productType: "isAddedToWishlist" | "isAddedToCart";
}

export const updateDispatchDB = async function ({
  productId,
  stateType,
  productType,
}: DispatchAction) {
  const userId = JSON.parse(
    localStorage.getItem("currentUser") || "{}",
  )?.replaceAll(/["]+/g, "");

  const token = JSON.parse(
    localStorage.getItem("shopEazyJWT") || "{}",
  )?.replaceAll(/["]+/g, "");

  try {
    if (userId) {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/update-dispatch-items/${userId}`,
        {
          productId,
          stateType,
          productType,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );

      if (response.status === 204) {
        SwalAlert({
          icon: "info",
          title: `Item Removed from ${stateType} successfully!`,
        });
      } else {
        SwalAlert({
          icon: "success",
          title: `Item Added to ${stateType} successfully!`,
        });
      }

      const { data } = response;
      console.log(response);

      // localStorage.setItem("wishlists", JSON.stringify(result))
      // localStorage.setItem('cartItems', JSON.stringify(result));
    }
  } catch (err) {
    handleAxiosErrors(err);
  }
};
