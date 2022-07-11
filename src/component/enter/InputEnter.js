import styled from "styled-components";

const Input = styled.input`
  width: 36rem;
  height: 8rem;
  border-radius: 2rem;
  font-size: 4rem;
  text-align: center;
  border: none;
  outline: none;
  font-weight: bolder;
  font-family: inherit;
  box-shadow: 0 1rem black;
  margin: 2rem;

  ::placeholder {
    color: var(--c, gray);
  }
  
  @media only screen and (max-width: 1000px) {
    width: 70vw;
    height: 5rem;
    font-size: 2rem;
  }
`

export default function InputEnter({type, placeholder}) {
	const handleEmpty = (event) => {
		let element = event.currentTarget
		if (element.value.length === 0) {
			element.placeholder = "empty"
			element.style.setProperty("--c", "red")
			setTimeout(() => {
				element.placeholder = placeholder
				element.style.setProperty("--c", null)
			}, 500)
		}
	}

	return (<Input type={type} placeholder={placeholder} onBlur={handleEmpty}/>)
}