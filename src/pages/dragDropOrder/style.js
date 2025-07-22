import styled from 'styled-components';

export const ContainerStyles = styled.div`
	.react-kanban-column {
		border-radius: 8px;
		padding: 10px;
		max-width:320px;
		max-height: 100vh;
		scrollbar-width: none;
  	-ms-overflow-style: none;
	}
	.react-kanban-column ::-webkit-scrollbar {
		display: none;
	}
	.title {
		border-radius: 15px;
		padding: 6px;
		text-align: center;
		font-size: 16px;
		color: white;
	}
`;
