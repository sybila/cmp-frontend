<?php

namespace APIModel;

class CompartmentsModel extends ParentedAPIModel
{


	public function getAllowedParents(): array
	{
		return [
			'model' => ModelsModel::class
		];
	}

}
