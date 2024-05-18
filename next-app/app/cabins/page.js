import Counter from "../components/Counter";

export default async function Page() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  console.log(data); // Do đây là Server Component nên log sẽ hiện ở terminal, chứ không phải ở console của trình duyệt
  return (
    <div>
      <h1>Cabins</h1>
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <Counter data={data} />{" "}
      {/* Truyền data từ Server Component xuống Client Component */}
    </div>
  );
}
