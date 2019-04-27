<?php

namespace APIModel;

abstract class ParentedAPIModel extends BaseAPIModel implements IParentedAPIModel
{

	private $parentId;

	/** @var BaseAPIModel */
	private $parentObj;


	public function __construct($baseURI)
	{
		parent::__construct($baseURI);
	}


	public function getParentURI(): string
	{
		return $this->parentObj->getURI($this->parentId);
	}


	public function getURI(int $id = null): string
	{
		return $this->getParentURI() . $this->getMyUri($id);
	}


	public function setParent(BaseAPIModel $parentObj, int $parentId): ParentedAPIModel
	{
		$this->parentObj = $parentObj;
		$this->parentId = $parentId;
		return $this;
	}

}
