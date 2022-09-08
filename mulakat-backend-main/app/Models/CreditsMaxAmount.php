<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class CreditsMaxAmount extends Pivot
{
    //
    protected $fillable = [
        'bank_id',
        'credit_type_id',
        'max_amount',
    ];
}
