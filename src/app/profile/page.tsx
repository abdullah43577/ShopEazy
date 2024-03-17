import Link from "next/link";

export default function Profile() {
  return (
    <div className="text-white">
      <h3 className="mb-2 text-xl font-semibold">Hello Michael,</h3>
      <p className="max-w-[650px] text-sm">
        From your account profile, you can easily check & view your{" "}
        <Link href="/profile/orders" className="text-bookmark underline">
          Recend Orders
        </Link>
        , manage your{" "}
        <Link href="/profile/addresses" className="text-bookmark underline">
          shipping and billing addresses
        </Link>
        , and edit your password and account details
      </p>
    </div>
  );
}
