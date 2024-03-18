import { fetchComments } from "./api";
import "./PostDetail.css";
import { useQuery } from "@tanstack/react-query";

export function PostDetail({ post }) {
  const { data, isError, isLoading, error } = useQuery({
    queryKey: [`comments`, post.id],
    queryFn: () => fetchComments(post.id),
    staleTime: 10000,
  });

  if (isError) {
    return <div>{error.toString()}</div>;
  }

  if (isLoading) {
    return <div>로딩 중입니다</div>;
  }
  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button>Delete</button> <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
