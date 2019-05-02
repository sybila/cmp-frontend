<?php

namespace APIModel;

class SpeciesModel extends ParentedAPIModel
{


	/**
	 * {@inheritdoc}
	 */
	public function getAllowedParents(): array
	{
		return [
			'compartment' => CompartmentsModel::class
		];
	}

}
