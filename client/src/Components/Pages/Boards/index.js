
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBoards } from "../../../Services/boardsService";
import CreateBoard from "../../Modals/CreateBoardModal/CreateBoard";
import { useNavigate } from "react-router-dom";
import './index.scss'
import Navbar from "../../Navbar";
import Loading from "../../Loading";

const Boards = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pending, boardsData } = useSelector((state) => state.boards);
  const [openModal, setOpenModal] = useState(false);
  const [searchString, setSearchString] = useState('');
  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleClick = (e) => {
    navigate(`/board/${e.target.id}`)
  }

  useEffect(() => {
    getBoards(false, dispatch);
  }, [dispatch]);

  useEffect(() => {
    document.title = "Boards | Boostme"
  }, [])
  console.log(searchString);

  return (
    <>
      {pending && <Loading />}
      <div className="boards-container">
        <Navbar searchString={searchString} setSearchString={setSearchString} />
        <div className="wrapper">
          <div className="tittle">My Boards</div>
          <div className="list-boards">
            {!pending &&
              boardsData.length > 0 &&
              boardsData.filter(item => searchString ? item.title.toLowerCase().includes(searchString.toLowerCase()) : true).map((item) => {
                return (
                  <div className="board" key={item._id} id={item._id}
                    style={item.isImage ? { backgroundImage: `url(${item.backgroundImageLink})` } : { backgroundColor: item.backgroundImageLink }}
                    onClick={(e) => handleClick(e)}>
                    {item.title}
                  </div>
                );
              })}
          </div>
          {!pending && (
            <div className="add-board" onClick={() => setOpenModal(true)}>
              Create new board
            </div>
          )}
          {openModal && <CreateBoard callback={handleModalClose} />}
        </div>
      </div>
    </>
  );
};

export default Boards