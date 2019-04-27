<?php

class URIHelper
{

	private $apiUri;


	public function __construct($apiUri)
	{
		$this->apiUri = $apiUri;
	}


	public function getApiUri(): string
	{
		return $this->apiUri;
	}

}
