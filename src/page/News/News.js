import { useState, useEffect } from 'react';
import { toastMessage } from '~/utils/toast';
import { Toaster } from 'react-hot-toast';
import './news.css';

export default function News() {
  // const edges = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // const handleClick = (e) => {
  //   console.log(e.target.value);
  // };
  // const handleToast = () => {
  //   toastMessage.success('Đăng nhập tài khoản thành công');

  //   console.log(124);

  //   // alert(123)
  // };
  // return (
  //   <ul>
  //     <p onClick={handleToast}>click me</p>
  //     <Toaster />

  //     {/* {edges.map((result) => (
  //       <li onClick={handleClick}>{result}</li>
  //     ))} */}
  //   </ul>
  // );
  // const nodes = ['A', 'B', 'C', 'D'];
  // const edges = [
  //   { from: 'A', to: 'B', weight: 2 },
  //   { from: 'A', to: 'C', weight: 4 },
  //   { from: 'B', to: 'C', weight: 1 },
  //   { from: 'B', to: 'D', weight: 5 },
  //   { from: 'C', to: 'D', weight: 1 },
  // ];

  // const graph = Graph();
  // nodes.forEach((node) => graph.addNode(node));
  // edges.forEach((edge) => graph.addEdge(edge.from, edge.to, edge.weight));

  // const [startNode, setStartNode] = useState('');
  // const [endNode, setEndNode] = useState('');
  // const [shortestPath, setShortestPath] = useState([]);

  // const handleFindShortestPath = () => {
  //   // const result = graph.shortestPath(startNode, endNode);
  //   // setShortestPath(result.path);
  // };
  return (
    <input type='file' />
    // <div>
    //   <input type="text" placeholder="Start Node" value={startNode} onChange={(e) => setStartNode(e.target.value)} />
    //   <input type="text" placeholder="End Node" value={endNode} onChange={(e) => setEndNode(e.target.value)} />
    //   <button onClick={handleFindShortestPath}>Find Shortest Path</button>
    //   <p>Shortest Path: {shortestPath.join(' -> ')}</p>
    // </div>
  );
}
