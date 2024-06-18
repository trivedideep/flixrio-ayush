import React, { useEffect, useState } from "react";
import { CloseRounded } from "@mui/icons-material";
import { Modal } from "@mui/material";
import styled from "styled-components";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import axios from "axios";
import Uploadvali from "./Uploadvali";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: top;
  justify-content: center;
  overflow-y: scroll;
`;

const Wrapper = styled.div`
  max-width: 500px;
  width: 100%;
  border-radius: 16px;
  margin: 50px 20px;
  height: min-content;
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  margin: 12px 20px;
`;

const TextInput = styled.input`
  width: 100%;
  border: none;
  font-size: 14px;
  border-radius: 3px;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text_secondary};
`;

const Desc = styled.textarea`
  width: 100%;
  border: none;
  font-size: 14px;
  border-radius: 3px;
  background-color: transparent;
  outline: none;
  padding: 10px 0px;
  color: ${({ theme }) => theme.text_secondary};
`;
const OutlinedBox = styled.div`
  min-height: 48px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  color: ${({ theme }) => theme.text_secondary};
  ${({ googleButton, theme }) =>
    googleButton &&
    `
    user-select: none; 
  gap: 16px;`}
  ${({ button, theme }) =>
    button &&
    `
    user-select: none; 
  border: none;
    font-weight: 600;
    font-size: 16px;
    background: ${theme.button};
    color:'${theme.bg}';`}
    ${({ activeButton, theme }) =>
    activeButton &&
    `
    user-select: none; 
  border: none;
    background: ${theme.primary};
    color: white;`}
  margin: 3px 20px;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 14px;
`;
const Select = styled.select`
  width: 100%;
  border: none;
  font-size: 14px;
  border-radius: 3px;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text_secondary};
`;

const Option = styled.option`
  width: 100%;
  border: none;
  font-size: 14px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.card};
  outline: none;
  color: ${({ theme }) => theme.text_secondary};
`;

const Flex = styled.div`
  width: 100%;
  display: flex;
  gap: 6px;
`;

const Error = styled.div`
  color: red;
  font-size: 10px;
  margin: 2px 26px 8px 26px;
  display: ${({ error }) => (error ? "block" : "none")};
`;

const UploadFile = ({ uploadOpen, setUploadOpen }) => {
  const user_data = JSON.parse(localStorage.getItem("loginuser"));
  const [podcast, setPodcast] = React.useState({
    name: "",
    desc: "",
    thumbnail: "",
    category: "",
    type: "audio",
    file: "",
    u_id: user_data ? user_data.id : 0,
  });
  const [values, setValues] = useState({
    v_name: "",
    desc: "",
  });
  const [showEpisode, setShowEpisode] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [path, setpath] = React.useState("");
  const [Category, setCategory] = useState([]);
  const [lan, setlan] = useState([]);

  const [errors, setErrors] = useState({});

  const trim = () => {
    const titles = document.getElementsByClassName("ant-upload-list-item-name");
    for (let i = 0; i < titles.length; i++) {
      titles[i].innerHTML =
        titles[i]?.innerHTML.length > 15
          ? `${titles[i]?.innerHTML.slice(0, 15)}...`
          : titles[i]?.innerHTML;
    }
  };

  const props = {
    name: "file",
    action: "http://localhost:8080/upload",
    headers: {
      authorization: "authorization-text",
    },
    beforeUpload: (file) => {
      const isMP4 = file.type === "video/mp4";
      if (!isMP4) {
        message.error("You can only upload MP4 file!");
      }
      return isMP4;
    },
    onChange(info) {
      trim();
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        setPodcast({ ...podcast, file: info.file.response.file.path });
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const thumbprops = {
    name: "file",
    action: "http://localhost:8080/tmb_upload",
    headers: {
      authorization: "authorization-text",
    },
    beforeUpload: (file) => {
      console.log(file.type);
      const isImage =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif";
      if (!isImage) {
        message.error("You can only upload JPG/PNG/GIF file!");
      }
      return isImage;
    },
    onChange(info) {
      trim();
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        setPodcast({ ...podcast, thumbnail: info.file.response.file.path });
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.preventDefault();
    const validationErrors = Uploadvali(podcast);
    setErrors(validationErrors);
    if (errors.name === "" && errors.desc === "") {
      axios
        .post("http://localhost:8080/insup", podcast)
        .then((res) => {
          if (res.status === 200) {
            message.success("Video uploaded successfully!");
            setUploadOpen(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const goToAddEpisodes = () => {
    setShowEpisode(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/cat", {
          withCredentials: true, // Ensure cookies are sent
        });
        if (response.status === 200) {
          setCategory(response.data);
        } else {
          setCategory(null);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
        setCategory(null);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await axios.get("http://localhost:8080/lan", {
          withCredentials: true, // Ensure cookies are sent
        });
        if (response.status === 200) {
          setlan(response.data);
        } else {
          setlan(null);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
        setlan(null);
      }
    };

    fetchData1();
  }, []);


  return (
    <Modal
      open={uploadOpen}
      onClose={() => setUploadOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container>
        <Wrapper>
          <CloseRounded
            style={{
              position: "absolute",
              top: "24px",
              right: "30px",
              cursor: "pointer",
            }}
            onClick={() => setUploadOpen(false)}
          />
          <Title>Upload Video</Title>
          <OutlinedBox style={{ marginTop: "12px" }}>
            <TextInput
              placeholder="video Name*"
              type="text"
              name="name"
              value={podcast?.name}
              onChange={(e) => setPodcast({ ...podcast, name: e.target.value })}
            />
          </OutlinedBox>
          <Error error={errors.name}>{errors.name}</Error>

          <OutlinedBox style={{ marginTop: "6px" }}>
            <Desc
              placeholder="video Description* "
              name="desc"
              rows={5}
              value={podcast?.desc}
              onChange={(e) => setPodcast({ ...podcast, desc: e.target.value })}
            />
          </OutlinedBox>
          <Error error={errors.desc}>{errors.desc}</Error>

          <Flex>
            {/* <OutlinedBox
              style={{ marginTop: "6px", width: "100%", marginRight: "0px" }}
            >
              <Select
                name="Language"
                onChange={(e) =>
                  setPodcast({ ...podcast, lan: e.target.value })
                }
              >
                <Option value="0" selected disabled hidden>
                  Select language
                </Option>
                {lan.map((lan) => (
                  <Option value={lan.l_id}>{lan.l_name}</Option>
                ))}
              </Select>
            </OutlinedBox> */}
            <OutlinedBox
              style={{ marginTop: "6px", width: "100%", marginLeft: "15px" }}
            >
              <Select
                name="categgory"
                onChange={(e) =>
                  setPodcast({ ...podcast, category: e.target.value })
                }
              >
                <Option value="0" selected disabled hidden>
                  Select Category
                </Option>
                {Category.map((category) => (
                  <Option value={category.c_id}>{category.name}</Option>
                ))}
              </Select>
            </OutlinedBox>
            
          </Flex>
          <Error error={errors.category}>{errors.category}</Error>
          <Flex>
            <Upload {...props}>
              <Button
                icon={<UploadOutlined />}
                style={{
                  backgroundColor: "transparent",
                  color: "green",
                  height: "100px",
                  width: "215px",
                  borderStyle: "dashed",
                  marginLeft: "21px",
                  marginTop: "4px",
                }}
              >
                Click to Upload Video
              </Button>
            </Upload>

            <Upload {...thumbprops}>
              <Button
                icon={<UploadOutlined />}
                style={{
                  backgroundColor: "transparent",
                  color: "green",
                  height: "100px",
                  width: "215px",
                  borderStyle: "dashed",
                  marginTop: "4px",
                }}
              >
                Click to Upload Thumbnail
              </Button>
            </Upload>
          </Flex>
          <OutlinedBox
            button={true}
            activeButton={disabled}
            style={{ marginTop: "22px", marginBottom: "18px" }}
            onClick={handleSubmit}
          >
            Upload
          </OutlinedBox>
        </Wrapper>
      </Container>
    </Modal>
  );
};

export default UploadFile;
