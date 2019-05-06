<?php

namespace APIModel;

abstract class ParentedAPIModel extends BaseAPIModel implements IParentedAPIModel
{

	/** @var integer */
	private $parentId;

	/** @var BaseAPIModel */
	private $parentObj;


	public function __construct($baseURI)
	{
		parent::__construct($baseURI);
	}


	/**
	 * Return array of allowed parents for respective object
	 * Parent object in this context relates to API resource object hierarchy
	 * @return array
	 */
	abstract protected function getAllowedParents(): array;


	/**
	 * Return URI of parent object, compose recursively for nested parented objects up to unparented root
	 * Parent object in this context relates to API resource object hierarchy
	 * @return string	URI string
	 */
	protected function getParentURI(): string
	{
		return $this->parentObj->getURI($this->parentId);
	}


	/**
	 * {@inheritdoc}
	 */
	protected function getURI(int $id = null): string
	{
		return $this->getParentURI() . $this->getMyUri($id);
	}


	/**
	 * {@inheritdoc}
	 */
	public function setParent(BaseAPIModel $parentObj, int $parentId): ParentedAPIModel
	{
		$allowed = $this->getAllowedParents();
		foreach ($allowed as $type) {
			if ($parentObj instanceof $type) {
				$this->parentObj = $parentObj;
				$this->parentId = $parentId;
				return $this;
			}
		}
		// TODO
		throw new \Exception('Bad parrent');
	}

}
