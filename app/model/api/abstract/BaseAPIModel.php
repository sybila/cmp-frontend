<?php

namespace APIModel;

use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Psr7\Response;

abstract class BaseAPIModel implements IBaseAPIModel
{

	/** @var Client */
	private $client;

	/** @var string */
	protected $baseURI;


	public function __construct(string $apiURI)
	{
		$this->client = new Client();
		$this->baseURI = $apiURI;
	}


	/**
	 * Return URI part reflecting requested object
	 * provided id, returns detail resource URI, otherwise collection resource URI
	 * @param int $id	id of specific object
	 * @return string	URI string
	 */
	protected function getMyURI(int $id = null): string
	{
		$URI = '';
		$m = [];
		preg_match('#(\w+)Model$#', get_class($this), $m);
		$URI = '/' . strtolower($m[1]);
		$id === null ?: $URI .= '/' . $id;

		return $URI;
	}


	/**
	 * Return complete object resource URI,
	 * provided id, returns detail resource URI, otherwise collection resource URI
	 * @param int $id	id of specific object
	 * @return string	URI string
	 */
	protected function getURI(int $id = null): string
	{
		return $this->baseURI . $this->getMyURI($id);
	}


	/**
	 * Fire HTTP request to API provided request type
	 * @param string $method	type of HTTP method
	 * @param int $id			optional id of object for detailed resouce, @see InterfaceAPIModel::getURI()
	 * @return array|null		HTTP response data
	 */
	protected function request(string $method, int $id = null): ?array
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


	/**
	 * {@inheritdoc}
	 */
	public function getOne(int $id): ?array
	{
		return $this->request('GET', $id);
	}


	/**
	 * {@inheritdoc}
	 */
	public function getCollection(): ?array
	{
		return $this->request('GET', null);
	}


	public function postOne(int $id)
	{
		//TODO
		return $this->request('POST', $id);
	}

}
