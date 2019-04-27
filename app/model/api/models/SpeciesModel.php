<?php

namespace APIModel;

class SpeciesModel extends ParentedAPIModel
{


	public function getAllowedParents(): array
	{
		return [
			'compartment' => CompartmentsModel::class
		];
	}

}
