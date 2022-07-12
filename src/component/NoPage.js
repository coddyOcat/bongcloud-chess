import styled from "styled-components";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const CenterText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 2rem;
  font-weight: bolder;
  text-shadow: 3px 3px gray;

  @media only screen and (max-width: 1000px) {
    font-size: 1.5rem;
  }
`

export default function NoPage() {
	const navigate = useNavigate()

	useEffect(() => {
		let side = localStorage.getItem("side")
		if (side !== "") {
			navigate("/table")
		}
	});

	return <CenterText> 404 Not Found </CenterText>
}