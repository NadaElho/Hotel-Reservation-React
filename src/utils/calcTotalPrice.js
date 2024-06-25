import axiosInstance from '../../interceptor';

const calculateTotalPrice = async (room, calcNoOfNights) => {
  let calcTotalPrice = 0;

  try {
    const userId = localStorage.getItem("userId")
    let user = "";
    if(userId){
      console.log("hiii");
      const {data} = await axiosInstance.get(`/users/${userId}`);
      user = data.data;
    }
    if (room.promotionId[0]) {
      calcTotalPrice = calcNoOfNights * room.price * (1 - room.promotionId[0].percentage / 100);
    } else {
      calcTotalPrice = calcNoOfNights * room.price;
    }

    if (user && user?.subscriptionId) {
      calcTotalPrice *= (1 - user.subscriptionId.percentage / 100);
    }
  } catch (error) {
    console.log(error);
  }

  return Math.round(calcTotalPrice);
};

export default calculateTotalPrice;
