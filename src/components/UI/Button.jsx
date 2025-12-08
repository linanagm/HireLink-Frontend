export default function Button({ children, onClick, type = "button", loading = false }) {


  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`bg-fuchsia-700 text-white p-2 rounded w-full hover:bg-fuchsia-400 disabled:bg-gray-400`}
    >
      {loading ? "Processing..." : children}
    </button>
  );
}
