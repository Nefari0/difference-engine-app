import styled from "styled-components";

export const Header = styled.header`
    width:100vw;
    height:80px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.65);

    display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: center;
	align-content: stretch;

    h1 {
        font-size:32px;
        height:40px;
        font-weight:200;
        color:#555;
        text-align:left;
        padding-left:5px;
        font-family: 'Silkscreen', cursive;
        margin:0px;

        @media (max-width:550px) {
            font-size:20px;
        }
    }
`

export const ImageContainer = styled.div`
    position:absolute;
    right:50px;
    top:20px;
    width:25px;
    height:25px;
    border-radius:50%;
    background-color:blue;
    overflow:hidden;

    img {
        position:absolute;
        left:-12px;
        top:-5px;
        width:50px;
        height:auto;
    }
`

export const AppContainer = styled.main`
    position:relative;
    text-align: center;
    width:100vw;
    min-height:100vh;
    display:flex;
    flex-direction:column;
`

export const Adapter = styled.section`
    position:relative;
    margin:auto;
    margin-top:50px;
    width:500px;
    height:700px;

    @media (max-width:620px) {
        width:350px;
    }

    @media (max-width:400px) {
        width:300px;
    }
`