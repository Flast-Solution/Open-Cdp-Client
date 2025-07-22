import { useState, useEffect } from "react";
import { Col, Tag, Popconfirm } from "antd";
import { DeleteOutlined } from '@ant-design/icons';

const FileUploadView = ({ 
	files = [],
  multiPathFile,
  onRemoveFile = (file) => file,
	onRemoveMultiPathFile = (value) => value
}) => {

	const [ multiPaths, setmultiPaths ] = useState([]);
	useEffect(() => {
		let files = multiPathFile.map(f => f.name);
		setmultiPaths(files);
	}, [multiPathFile]);

	const onDelete = (name) => {
		if(String(name).startsWith("http")) {
			onRemoveFile(name);
		} else {
			onRemoveMultiPathFile(name)
		}
	}

	const onClick = (file) => {
		if(String(file).startsWith("http")) {
			window.open(file, '_blank');
		}
	}

	return [...multiPaths, ...files].map( (file, key) =>
		<Col span={8} key={key}>
			<Tag 
				color="#108ee9"
				icon={
					<Popconfirm
						title="Bạn có chắc muốn xóa File này ?"
						onConfirm={() => onDelete(file)}
						okText="Yes"
						cancelText="No"
					>
						<DeleteOutlined />
					</Popconfirm>
				} 
			>
				<span onClick={() => onClick(file)} >
					{ file.split("/").filter(Boolean).pop() }
				</span>
			</Tag>
		</Col>
	)
}

export default FileUploadView;