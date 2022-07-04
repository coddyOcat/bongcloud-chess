import styled from "styled-components";

const Button = styled.button`
  width: 36rem;
  height: 8rem;
  border-radius: 2rem;
  font-size: 4rem;
  text-align: center;
  border: none;
  font-weight: bolder;
  font-family: inherit;
  box-shadow: 0 1rem black;
  margin: 0 2rem;
  background-color: var(--enter-button-background);
  color: white;
  cursor: pointer;
`

export default function ButtonEnter({value, handleButton}) {
	const handleHoverEnter = (event) => {
		let element = event.currentTarget
		element.style.background = "var(--enter-button-interact-background)"
	}

	const handleHoverOut = (event) => {
		let element = event.currentTarget
		element.style.background = "var(--enter-button-background)"
	}

	const handleClick = (event) => {
		let element = event.currentTarget
		element.style.transform = "translateY(0.5rem)"
		element.style.boxShadow = "0 0.5rem black"
		handleButton(event)
		setTimeout(() => {
			element.style.transform = ""
			element.style.boxShadow = "0 1rem black"
		}, 300)
	}

	return (<Button onMouseEnter={handleHoverEnter} onMouseOut={handleHoverOut} onClick={handleClick}>{value}</Button>)
}