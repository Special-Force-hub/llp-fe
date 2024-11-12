import React from 'react';
import styled from 'styled-components';
import IMG_TABLE from 'assets/table.png';

export const NoBuildingData = () => {
	return (
		<NoBuildingDataContainer>
			<img src={IMG_TABLE} alt="No Building Data" />
			<p>Empty table</p>
			<p>This tables do not contain any data. These tables are patiently waiting for information to populate them</p>
		</NoBuildingDataContainer>
	)
}

const NoBuildingDataContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 350px;
	margin: auto;
	margin-top: 10vh;
	text-align: center;

	& > p:nth-of-type(1) {
		color: #242225;
		font-size: 16px;
		font-weight: bold;
	}
	
	& > p:nth-of-type(2) {
		color: #6A5E71;
		font-size: 14px;
	}
`