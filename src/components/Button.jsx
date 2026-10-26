import { Link } from "react-router-dom";

export default function Button({ to, variant = "primary", children, ...rest }) {
  const className = `btn btn--${variant}`;
  if (to) {
    return (
      <Link className={className} to={to} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
}