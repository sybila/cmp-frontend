<?php

namespace APIModel;

class CompartmentsModel extends ParentedAPIModel
{


	/**
	 * {@inheritdoc}
	 */
	public function getAllowedParents(): array
	{
		return [
			'model' => ModelsModel::class
		];
	}

}
