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
	 * {@inheritdoc}
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


	/**
	 * {@inheritdoc}
	 */
	public function getURI(int $id = null): string
	{
		return $this->baseURI . $this->getMyURI($id);
	}


	/**
	 * {@inheritdoc}
	 */
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
