<?php

namespace APIModel;

interface IBaseAPIModel
{


	/**
	 * Fire HTTP GET request for collection of respective objects
	 * @see InterfaceAPIModel::request()
	 * @return array|null		HTTP response data
	 */
	public function getCollection(): ?array;


	/**
	 * Fire HTTP GET request for specific respective object
	 * @see					InterfaceAPIModel::request()
	 * @param int $id		optional id of object for detailed resouce, @see InterfaceAPIModel::getURI()
	 * @return array|null		HTTP response data
	 */
	public function getOne(int $id): ?array;


	public function postOne(int $id);
}

interface IParentedAPIModel extends IBaseAPIModel
{


	/**
	 * Set instance of parent object and identifier, validate type of parent object
	 * Parent object in this context relates to API resource object hierarchy
	 * @param \APIModel\BaseAPIModel $parentObj		Instance of Model object reflecting parent object in API hierarchy
	 * @param int $parentId							Parent object identifier
	 * @return \APIModel\ParentedAPIModel			@return self
	 */
	public function setParent(BaseAPIModel $parentObj, int $parentId): ParentedAPIModel;
}
