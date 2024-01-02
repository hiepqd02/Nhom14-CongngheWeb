import DoneRoundedIcon from "@mui/icons-material/DoneRounded";

const PhotoCardComponent = (props) => {
    const { link, selectedLink, callback } = props;
    return (
        <div className="photo-wrapper" style={{ backgroundImage: `url(${link})` }} onClick={() => callback(link)}>
            <div className="photo" style={{ backgroundColor: link === selectedLink ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.0)" }}>
                <div className="selected-icon" style={{ display: link === selectedLink ? 'flex' : 'none' }}>
                    <DoneRoundedIcon fontSize="3px" />
                </div>
            </div>
        </div>
    );
};

export default PhotoCardComponent;
