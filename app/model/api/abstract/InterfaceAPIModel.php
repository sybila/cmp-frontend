<?php

namespace APIModel;

interface IBaseAPIModel
{


	/**
	 * Return URI part reflecting requested object
	 * provided id, returns detail resource URI, otherwise collection resource URI
	 * @param int $id	id of specific object
	 * @return string	URI string
	 */
	public function getMyURI(int $id = null): string;


	/**
	 * Return complete object resource URI,
	 * provided id, returns detail resource URI, otherwise collection resource URI
	 * @param int $id	id of specific object
	 * @return string	URI string
	 */
	public function getURI(int $id = null): string;


	/**
	 * Fire HTTP request to API provided request type
	 * @param string $method	type of HTTP method
	 * @param int $id			optional id of object for detailed resouce, @see InterfaceAPIModel::getURI()
	 * @return array|null		HTTP response data
	 */
	public function request(string $method, int $id = null): ?array;


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
	 * Return URI of parent object, compose recursively for nested parented objects up to unparented root
	 * Parent object in this context relates to API resource object hierarchy
	 * @return string	URI string
	 */
	public function getParentURI(): string;


	/**
	 * Set instance of parent object and identifier, validate type of parent object
	 * Parent object in this context relates to API resource object hierarchy
	 * @param \APIModel\BaseAPIModel $parentObj		Instance of Model object reflecting parent object in API hierarchy
	 * @param int $parentId							Parent object identifier
	 * @return \APIModel\ParentedAPIModel			@return self
	 */
	public function setParent(BaseAPIModel $parentObj, int $parentId): ParentedAPIModel;


	/**
	 * Return array of allowed parents for respective object
	 * Parent object in this context relates to API resource object hierarchy
	 * @return array
	 */
	public function getAllowedParents(): array;
}
