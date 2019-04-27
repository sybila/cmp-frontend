<?php

namespace APIModel;

use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Psr7\Response;

abstract class BaseAPIModel implements IBaseAPIModel
{

	private $client;

	protected $baseURI;


	public function __construct(string $apiURI)
	{
		$this->client = new Client();
		$this->baseURI = $apiURI;
	}


	/**
	 * Assign request uri based on class name
	 * @return string
	 */
	public function getMyURI(int $id = null): string
	{
		$URI = '';
		$m = [];
		preg_match('#(\w+)Model$#', get_class($this), $m);
		$URI = '/' . strtolower($m[1]);
		$id === null ?: $URI .= '/' . $id;

		return $URI;
	}


	public function getURI(int $id = null)
	{
		return $this->baseURI . $this->getMyURI($id);
	}


	public function request(string $method, int $id = null): ?array
	{
		$URI = $this->getURI($id);
		try {
			$response = $this->client->request($method, $URI);
			$data = json_decode($response->getBody()->getContents(), true)['data'];
			return $id ? $data[0] : $data;
		} catch (\Exception $e) {
			//TODO
			dump("yikes" . $e->getMessage());
			return null;
		}
	}


	public function getOne(int $id): ?array
	{
		return $this->request('GET', $id);
	}

	public function getCollection(): ?array
	{
		return $this->request('GET', null);
	}


	public function postOne(int $id)
	{
		return $this->request('POST', $id);
	}

}
