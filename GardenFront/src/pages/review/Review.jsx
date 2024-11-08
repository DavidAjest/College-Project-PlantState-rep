import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import AuthenticatedGuard from "../../guards/Authenticated";
import { database } from "../../firebase";
import { toast } from "react-toastify";

function Review() {
  const { user } = useAuth();

  const onSubmitReview = async (e) => {
    e.preventDefault();
    const details = Object.fromEntries(new FormData(e.target).entries());
    try {
      await addDoc(collection(database, "reviews"), {
        ...details,
        user: user,
      });
      toast("Review submitted successfully");
      // clear the form
      e.target.reset();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <form
        onSubmit={onSubmitReview}
        style={{
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
        }}
        className="mx-auto mt-4 flex flex-col max-w-[500px] p-4"
      >
        <textarea
          className="border-[1px] border-[lightgray] p-2"
          name="review"
          placeholder="Leave us a review about our plant models"
        />
        <label className="font-bold text-[14px] my-2">Rate our model</label>
        <select name="rating">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <option value={num}>{num}</option>
          ))}
        </select>
        <br />
        <button className="border-[green] bg-[#458645] text-white">Submit review</button>
      </form>
    </div>
  );
}

export default AuthenticatedGuard(Review);
