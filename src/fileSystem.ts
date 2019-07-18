export interface FileSystemEntity {
	id: string;
	name: string;
	children: string[];
	parent?: string;
}

export interface FileSystem {
	[id: string]: FileSystemEntity;
}

const emptyFileSystem = {
	root: {
		id: 'root',
		name: 'Root',
		children: ['id0', 'id1'],
		parent: undefined
	}
};

export default emptyFileSystem;
