export default function FieldError({ touched, error }) {
	if (!touched || !error) return null;
	return <p className="text-xs text-red-600 mt-2">{error}</p>;
}
