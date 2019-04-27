<?php

namespace APIModel;

interface IBaseAPIModel
{


/**
 * Assign request uri based on class name
 * @return string
 */
public function getMyURI(int $id = null): string;


public function getURI(int $id = null);


public function request(string $method, int $id = null): ?array;


public function getCollection(): ?array;


public function getOne(int $id): ?array;


public function postOne(int $id);
}

interface IParentedAPIModel extends IBaseAPIModel
{


public function getParentURI(): string;

public function setParent(BaseAPIModel $parentObj, int $parentId): ParentedAPIModel;

public function getAllowedParents(): array;
}
